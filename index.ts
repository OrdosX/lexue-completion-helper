import asyncGetCookie from "./asyncGetCookie";
import asyncGetCourses from "./asyncGetCourses";
import asyncToggleCompletion from "./asymcToggleCompletion";

(async () => {
    let cookie = (await asyncGetCookie()).toString();
    let courses = await asyncGetCourses(cookie);
    courses.forEach(course => {
        asyncToggleCompletion(cookie, course.link)
    })
    console.log('完成 / Completed');
})().catch(e => {console.log(e)});