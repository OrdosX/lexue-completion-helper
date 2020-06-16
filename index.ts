import asyncGetCookie from "./asyncGetCookie";
import asyncGetCourses from "./asyncGetCourses";
import asyncToggleCompletion from "./asymcToggleCompletion";

(async () => {
    let cookie = (await asyncGetCookie()).toString();
    let courses = await asyncGetCourses(cookie);
    courses.forEach(course => {
        asyncToggleCompletion(cookie, course.link)
    })
})().catch(e => {console.log(e)});