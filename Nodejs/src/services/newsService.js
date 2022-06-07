import db from '../models/index'

let GetAllNews = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            let news = ''
            if (id === 'ALL') {
                news = await db.News.findAll()
            }
            if (id && id !== 'ALL') {
                news = await db.News.findOne({
                    where: {ID: id}
                })
            }

            if (news && news.avatar) {
                news.avatar = new Buffer(news.avatar, 'base64').toString('binary')
            }
            resolve(news)
        } catch (e) {
            reject(e);
        }
    })
}

let CreateNews = (data) => {
    return new Promise( async(resolve, reject)=>{
        try {
            if (!data.title && !data.avatar && !data.description) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                })
            } else {
                await db.News.create({
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    description: data.description,
                    title: data.title,
                    avatar: data.avatar,
                })
                resolve({
                    errCode: 0,
                    errMessage: "save news succeed"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let DeleteNews = (id) => {
    return new Promise(async (resolve, reject) => {
        let news = await db.News.findOne({
            where: {ID: id}
        })
        if (!news) {
            resolve({
                errCode: 2,
                errMessage: `The news is't exit`
            })
        }
        await db.News.destroy({
            where: {ID: id}
        })
        resolve({
            errCode: 0,
            message: 'the news is deleted'
        })
    })
}

let EditNews = (newsData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!newsData.ID) {
                resolve({
                    errCode: 2,
                    errMessage: `Missing required parameters`
                });
            }
            let news = await db.News.findOne({
                where: { ID: newsData.ID },
                raw: false
            })
            if (news) {
                news.contentHTML = newsData.contentHTML,
                news.contentMarkdown = newsData.contentMarkdown,
                news.description = newsData.description,
                news.title = newsData.title;
                if (news.avatar) {
                    news.avatar = newsData.avatar;
                }
                await news.save()
                resolve({
                    errCode: 0,
                    message: 'update the user succeeds'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `user's not found!`
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    GetAllNews: GetAllNews,
    CreateNews: CreateNews,
    DeleteNews: DeleteNews,
    EditNews: EditNews
}