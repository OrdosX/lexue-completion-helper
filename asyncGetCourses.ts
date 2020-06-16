import * as cheer from "cheerio";
import got from "got"

export default async (cookie: string) => {
    let page = await got.get("http://lexue.bit.edu.cn/my/", {
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
    let courseList = [];
    $("[title='我的课程']")
        .parent()
        .children(".dropdown-menu")
        .children()
        .each((index, element) => {
            courseList.push({
                name: element.firstChild.attribs["title"],
                link: element.firstChild.attribs["href"]
            })
        })
    return courseList;
}