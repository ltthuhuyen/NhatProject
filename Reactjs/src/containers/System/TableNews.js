import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Manage.scss';
import * as actions from "../../store/actions";
import { Table } from 'reactstrap';

import * as AiIcons from 'react-icons/ai';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
};


class TableNews extends Component {


    constructor(props) {
        super(props);
        this.state = {
            newsReducer: []
        }
    }

    componentDidMount() {
        this.props.allNews();
    }

    componentDidUpdate( prevProps, prevState, snapshot) {
        if (prevProps.listNews !== this.props.listNews) {
            this.setState({
                newsReducer: this.props.listNews,
            })
        }
    }

    handleDeleteNews= (news) => {
        this.props.deleteNews(news.id)
    }

    handleEditNews= (news) => {
        this.props.handleEditFromParent(news)
    }

    render() {
        let arrNews = this.state.newsReducer;
        return (
            <React.Fragment>
                <div className="table">
                <Table bordered>
                    <thead className='thead'>
                        <tr>
                            <th>STT</th>
                            <th>Tên tin tức</th> 
                            <th>Hình ảnh</th>    
                            <th>Mô tả</th>
                            <th>ContentHTML</th>
                            <th>Sửa</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
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
                </Table>
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
        allNews: () => dispatch(actions.getAllNews()),
        deleteNews: (id) => dispatch(actions.DeleteNewStart(id)),
        // editTeacherStart: (data) => dispatch(actions.editTeacherStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableNews);
