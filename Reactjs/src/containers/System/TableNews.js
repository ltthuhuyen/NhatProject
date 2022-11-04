import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { toast } from 'react-toastify'
import * as actions from "../../store/actions";
import * as AiIcons from 'react-icons/ai';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
// import './Manage.scss';
//import './News.scss'
import { allNews, deleteNews} from '../../services/newsService';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class TableNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrNews: [],
            newsEdit: {}
        }
    }

    async componentDidMount() { 
        await this.getAllNews()
    }

    componentDidUpdate( prevProps, prevState, snapshot) {
        if (prevProps.listNews !== this.props.listNews) {
            this.setState({
                newsReducer: this.props.listNews,
            })
        }
    }

    getAllNews = async () => {
        let response = await allNews("ALL");
        if(response && response.errCode == 0){
            this.setState({
                arrNews: response.news
            }, () => {
                console.log('arrNews', this.state.arrNews)
            })
        }
    }
    
    handleEditNews = async (news) => {
        this.props.history.push(`/system/edit-news/${news.id}`);
    }

    handleDeleteNews = async (news) => {
        try {
            let res = await deleteNews(news.id);
            if (res && res.errCode === 0) {
                toast.success("Xóa tin tức thành công");
                await this.getAllNews();
                this.props.history.push('/system/news-manage');
            } else {
                toast.error("Xóa tin tức không thành công");
            }
        } catch (e) {
            toast.error("Xóa tin tức không thành công");
        }
        
    }

    render() {
        let {arrNews} = this.state;
        return (
            <React.Fragment>
                <div className="table">
                    <thead className='thead'>
                        <tr>
                            <th>ID</th>
                            <th>Tên tin tức</th> 
                            <th>Hình ảnh</th>    
                            <th>Mô tả</th>
                            <th>ContentHTML</th>
                            <th>Sửa</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody className='tbody'>
                    {arrNews && arrNews.length > 0 &&
                        arrNews.map((item, index) => {
                            let imageBase64 = '';
                            if (item.avatar) {
                                imageBase64 = new Buffer(item.avatar, 'base64').toString('binary')  
                            }
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>
                                        <div className="img">
                                            <img src={imageBase64} className="img-img"  alt=" "/>
                                        </div>
                                    </td>
                                    <td>{item.description}</td>
                                    <td>{item.contentHTML}</td>
                                    <td><button className='btn btn-edit' onClick={()=>this.handleEditNews(item)}><AiIcons.AiOutlineEdit /></button></td>
                                    <td><button className='btn btn-delete' onClick={()=>this.handleDeleteNews(item)}><AiIcons.AiOutlineDelete /></button></td>
                                </tr>
                            )
                        })
                    }        
                    </tbody>
                </div>       
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        listNews: state.news.News
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // allNews: () => dispatch(actions.getAllNews()),
        deleteNews: (id) => dispatch(actions.DeleteNewStart(id)),
        // editTeacherStart: (data) => dispatch(actions.editTeacherStart(data))
    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableNews));
