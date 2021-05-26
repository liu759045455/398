import axios from "./http";

export function IndexList() {
    return axios({
        url: "/brigade/view/index",
        method: "post"
    })
}

export function PostBanners() {
    return axios({
        url: "/brigade/view/banners",
        method: "post"
    })
}


export function GetNews(data) {
    return axios({
        url: `/brigade/view/news`,
        method: "post",
        data
    })
}

export function GetSpecial(type) {
    return axios({
        url: `/brigade/view/specialClass/${type}`,
        method: "get",
    })
}

export function getCustomInfo(query) {
    return axios({
        url: `/brigade/view/custom/${query}`,
        method: "GET"
    });
}


export function getnewsCenter() {
    return axios({
        url: `/brigade/view/newsCenter`,
        method: "POST"
    });
}



export function getNews(data) {
    return axios({
        url: `/brigade/view/news`,
        method: "POST",
        data
    })
}


export function PostMostService(typeCode) {
    return axios({
        url: `/brigade/view/sublist/${typeCode}`,
        method: "POST",
    })
}
//文章
export function getArticle(type) {
    return axios({
        url: `/brigade/view/article/${type}`,
        method: "GET",
    })
}

//搜索页
export function getArticleList(data) {
    return axios({
        url: `/brigade/api/article/list`,
        method: "POST",
        data
    })
}


//菜单
export function getArticleTree() {
    return axios({
        url: `/brigade/view/articleTree`,
        method: "GET",
    })
}