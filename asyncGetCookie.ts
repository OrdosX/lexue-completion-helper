import * as cheer from "cheerio";
import * as fs from "fs";
import got from "got";
require("dotenv").config();

export default async () => {
    // 如果缓存了cookie，直接返回
    if(fs.existsSync("./.cookie") && fs.readFileSync("./.cookie").length != 0) {
        return fs.readFileSync("./.cookie");
    }
    //如果没有设置用户名和密码，报错退出
    if(process.env.BIT_ID == undefined || process.env.PASSWORD == undefined) {
        console.log('未设置用户名和密码 / Failed to read student ID and password');
        process.exit(-1);
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
    return finalCookie.headers["set-cookie"][0].split(";")[0];
}