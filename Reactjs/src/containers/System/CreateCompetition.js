import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from 'react-toastify';
import 'react-markdown-editor-lite/lib/index.css';
import * as actions from "../../store/actions"
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';
import './Manage.scss'
import { CRUD_ACTIONS, CommonUtils } from '../../utils';
import NavAdmin from '../../components/NavAdmin';
import {createNews , allNews} from '../../services/newsService'
import { createCompetition , allCompetitions} from '../../services/competitionService'

const mdParser = new MarkdownIt(/* Markdown-it options */);
class CreateCompetition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            title: '',
            isOpen: false,
            action: '',
            previewImg: '',
            avatar: '',
        }
        
    }

    async componentDidMount() {
        await this.getAllCompetitionsFromReact()
    }

    
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state}
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        })
    }

    handleOnChangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectURL = URL.createObjectURL(file);
            this.setState({
                previewImg: objectURL,
                avatar: base64
            })
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        
        let arrCheck = ['contentMarkdown','contentHTML','description','title']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('this input is required: '+ arrCheck[i]);
                break;
            }
        }
        return isValid;
    }

    getAllCompetitionsFromReact = async () => {
        let response = await allCompetitions("ALL");
        if(response && response.errCode == 0){
            this.setState({
                arrCompetitions: response.competitions
            })
        }
    }

    createCompetitionFromReact = async (data) => {
        let res = await createCompetition(data);
        if (res && res.errCode === 0) {
            toast.success("Thêm cuộc thi thành công");
            await this.getAllCompetitionsFromReact();
            this.props.history.push('/system/competition-manage');
        } 
        else if (res && res.errCode === 1){
            toast.error('Cuộc thi này đã tồn tại');
        }
        else {
            toast.error('Vui lòng điền đầy đủ thông tin');
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    };

    // handleEditFromParent = (news) => {
    //     let imageBase64 = '';
    //     if (news.avatar) {
    //         imageBase64 = new Buffer(news.avatar, 'base64').toString('binary')  
    //     }

    //     this.setState({
    //         contentMarkdown: news.contentMarkdown,
    //         contentHTML: news.contentHTML,
    //         description: news.description,
    //         title: news.title,
    //         action: CRUD_ACTIONS.EDIT,
    //         newsID: news.id,
    //         avatar: imageBase64,
    //         previewImg: imageBase64,
    //     })
    // }

    openPreviewImage = () => {
        if (!this.state.previewImg) {
            return;
        }
        this.setState({
            isOpen: true,
        })
    }

    handleSaveCompetition = async () => {
        await this.createCompetitionFromReact({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            title: this.state.title,
            avatar: this.state.avatar
        })
    }


    render() {
        let { processLogout , userInfo } = this.props;
        let imageBase64 = ''
        if (userInfo.image) {
            imageBase64 = new Buffer(userInfo.image, 'base64').toString('binary')  
            } 
        return (
            <>
            <NavAdmin/>
            <div className="main_content">
                <div className='row header'>
                    <div className='d-flex'>
                        <div className="img">
                                <img src={imageBase64} className='img-img'/>
                            </div>
                            <div className='profile-info'>Xin chào {userInfo && userInfo.firstName + userInfo.lastName  ? userInfo.firstName + ' ' + userInfo.lastName : '' }</div>
                        </div>  
                </div>
                <div className='row title d-flex'>
                    <div className='col-6 title-manage'>QUẢN LÝ CUỘC THI</div>
                    <div className='serach_field-area d-flex align-items-center'>
                        <input type="text" placeholder="Search here..."
                            onChange={(e) => {this.handleOnChangeInput(e, 'search')}}/>
                        <button type="search" className="btn btn-search rounded-pill"
                            onClick = {() => this.handleSearch()}
                        ><BsIcons.BsSearch/> Tìm</button>
                    </div>
                    <button 
                        className='col-1 btn btn-create '
                        onClick={this.handleAddNews}
                        >
                        <MdIcons.MdOutlineCreate/> <FormattedMessage id='manage-user.add'/>
                    </button>
                </div> 
            </div>
         
                
            <div  data-aos="fade-up" className="news-container">
                <div className="row row1-news ">
                    <div className="col-3 img-news">
                        <label >
                            <FormattedMessage id="manage-news.image"/>
                        </label>
                        <div className="preview-img-container">
                            <input
                                id="previewImg"
                                type="file" hidden
                                onChange = {(event) => this.handleOnChangeImg(event)}
                            />
                            <label className="upload-file" htmlFor="previewImg"><FormattedMessage id="common.upload-image"/> <i className="fas fa-upload"></i></label>
                            <div className="preview-img"
                                // style={{ backgroundImage: `url(${this.state.previewImg})` }}
                                onClick={() => this.openPreviewImage()}
                            >
                                <img src={this.state.avatar} className='img-img'/>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="manage-news.name"/>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            // placeholder="Tiêu đề"
                            value={this.state.title}
                            onChange={(event) => {this.handleOnChangeInput(event, 'title')}}
                        />
                    </div>
                    <div className="col-5 form-group">
                        <label >
                            <FormattedMessage id="manage-news.description"/>
                        </label>
                        <textarea className="form-control"  rows="4"
                            onChange={(event) => this.handleOnChangeInput(event, 'description')}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className="news-about-editor mt-3">
                    {/* <label style={{fontSize: "18px", fontWeight: "bold"}}>
                        <FormattedMessage id="news.tintuc" />
                    </label> */}
                    <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <div
                    className="btn btn-save mt-3"
                    onClick={() => this.handleSaveCompetition()}
                >
                    Lưu
                    {/* <button
                        className={ this.state.action === CRUD_ACTIONS.EDIT?"btn btn-save":"btn btn-save" }
                    >
                        {this.state.action === CRUD_ACTIONS.EDIT?
                            <FormattedMessage id="common.save" /> :
                            <FormattedMessage id="common.save"/>
                        }
                    </button> */}
                </div>
              
            </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        // teachers: state.news.teachers,
        // language: state.app.language,
        listNews: state.news.News,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveNewsStart: (data) => dispatch(actions.saveNewsStart(data)),
        editNewsStart: (data) => dispatch(actions.editNewsStart(data)),
        // allNews: () => dispatch(actions.getAllNews()),
        
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateCompetition));
