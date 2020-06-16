import * as cheer from "cheerio";
import got from "got"

export default async (cookie: string, link: string) => {
    let page = await got.get(link, {
        headers: {
            'Host': 'lexue.bit.edu.cn',
            'Connection': 'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
            'cookie': cookie
        }
    });
    let $ = cheer.load(page.body);
    $(".togglecompletion").each((index, element) => {
        let form = {
            id: "",
            sesskey: "",
            completionstate: "",
            fromajax: "1"
        };
        element.firstChild.children.forEach(e => {
            if(e.attribs["name"] == "id" || e.attribs["name"] == "sesskey" || e.attribs["name"] == "completionstate") {
                form[e.attribs["name"]] = e.attribs["value"];
            }
        })
        if (form.completionstate == "0") {
            return;
        }
        got.post(element.attribs["action"], {
            form: form,
            headers: {
                'Host': 'lexue.bit.edu.cn',
                'Connection': 'keep-alive',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
                'cookie': cookie
            }
        })
    })
}