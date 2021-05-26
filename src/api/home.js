import request from '@/utils/request'

// 首页信息
export function HomeListData() {
    return request({
        url: '/brigade/hView/index',
        method: 'post',
    })
}

//关于我们
export function getCustomInfo(query) {
    return request({
        url: `/brigade/view/custom/${query}`,
        method: "GET"
    });
}
// 查看新闻中心列表
export function NewCodeType(data) {
    return request({
        url: '/brigade/view/news',
        method: 'post',
        data
    })
}

//新闻中心
export function getnewsCenter() {
    return request({
        url: `/brigade/view/newsCenter`,
        method: "POST"
    });
}
//轮播图
export function HomeBanners(data) {
    return request({
        url: '/brigade/hView/banners',
        method: 'post',
        data
    })
}

//专班服务
export function HomeSpecia(type) {
    return request({
        url: `/brigade/view/specialClass/${type}`,
        method: 'get',
    })
}

//所有Banner图
export function GetBanners(type) {
    return request({
        url: `/brigade/view/custom/${type}`,
        method: 'get',
    })
}


export function getNews(data) {
    return request({
        url: `/brigade/view/news`,
        method: "POST",
        data
    })
}
//技术支持
export function PostTechnical(data) {
    return request({
        url: `brigade/view/news`,
        method: 'post',
        data
    })
}

//文章
export function getArticle(type) {
    return request({
        url: `/brigade/view/article/${type}`,
        method: "GET",
    })
}
// 搜索接口
export function PostSeach(data){
    return request({
        url:`/brigade/api/article/list`,
        method:'post',
        data
    })
}

//code查看
export function CodeSeach(data){
    return request({
        url:`/brigade/view/news`,
        method:'post',
        data
    })
}

