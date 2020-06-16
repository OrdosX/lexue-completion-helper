import * as cheer from "cheerio";
import * as fs from "fs";
import got from "got";
require("dotenv").config();

export default async () => {
    // 如果缓存了cookie，验证成功后直接返回
    if(fs.existsSync("./.cookie") && fs.readFileSync("./.cookie").length != 0) {
        let cookie = fs.readFileSync("./.cookie");
        // 尝试获取主页，如果被重定向则是cookie过期，重新登陆
        let home = await got.get("http://lexue.bit.edu.cn/my/", {
            followRedirect: false,
            headers: {
                'Host': 'lexue.bit.edu.cn',
                'Connection': 'keep-alive',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
                'cookie': cookie.toString()
            }
        });
        if(home.statusCode != 200) {
            console.log('cookie缓存过期，尝试登录 / Cookie out of date, attempt to login');
        } else {
            return cookie;
        }
    }
    //如果没有设置用户名或密码，报错退出
    if(process.env.BIT_ID  === "" || process.env.PASSWORD  === "") {
        console.log('未设置用户名或密码 / Failed to read student ID or password');
        process.exit(0);
    }
    // 否则执行登录流程
    let loginPage = await got.get("https://login.bit.edu.cn/cas/login?service=http%3A%2F%2Flexue.bit.edu.cn%2Flogin%2Findex.php", {
        followRedirect: false
    })
    let $ = cheer.load(loginPage.body);
    let ticket = await got.post("https://login.bit.edu.cn/cas/login?service=http%3A%2F%2Flexue.bit.edu.cn%2Flogin%2Findex.php", {
        followRedirect: false,
        form: {
            username: process.env.BIT_ID,
            password: process.env.PASSWORD,
            lt: $("[name='lt']").val(),
            execution: $("[name='execution']").val(),
            _eventId: "submit",
            rmShown: "1"
        },
        headers: {
            'Host': 'login.bit.edu.cn',
            'Connection': 'keep-alive',
            'Origin': 'https://login.bit.edu.cn',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'Referer': 'https://login.bit.edu.cn/cas/login?service=http%3A%2F%2Flexue.bit.edu.cn%2Flogin%2Findex.php',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
            'cookie': loginPage.headers["set-cookie"][0].slice(0, 48)
        }
    })
    if(ticket.statusCode == 200) {
        // 登陆信息错误 => 200，信息正确 => 302
        console.log('用户名或密码错误 / Invalid student ID or password');
        process.exit(0);
    }
    let tempCookie = await got.get(ticket.headers.location, {
        followRedirect: false
    });
    let finalCookie = await got.get(tempCookie.headers.location, {
        followRedirect: false,
        headers: {
            'Host': 'lexue.bit.edu.cn',
            'Connection': 'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
            'Cookie': tempCookie.headers["set-cookie"][0].split(";")[0]
        }
    });
    fs.writeFileSync("./.cookie", finalCookie.headers["set-cookie"][0].split(";")[0]);
    console.log('登陆成功 / Login succeed');
    return finalCookie.headers["set-cookie"][0].split(";")[0];
}