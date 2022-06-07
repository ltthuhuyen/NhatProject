import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {emitter} from '../../utils/emitter'
import {LANGUAGES ,  CommonUtils} from "../../utils";
import { changeLanguageApp } from '../../store/actions';
import { FormattedMessage } from 'react-intl';
import Lightbox from 'react-image-lightbox';
import './Create.scss'
class ModalProduct extends Component {

    constructor(props){
        super(props);
        this.state = {
            product_name: '',
            image: '',
            description: ''
        
        }
        this.listenToEmiiter()

    }

    listenToEmiiter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.state = ({
                product_name: '',
                image: '',
                description: ''
            })
        })
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnchangeImage = async (event) =>{
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                image: base64
            })
        }
    }

    handleOnChangeInput =(e ,id) =>{
        let copyState = {...this.state};
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        }, () => {
            // console.log('check good state' , this.state)
        } )
    }

    checkValideInput = () => {
        let isValid = true
        let arrInput = ['product_name', 'description']
        for(let i = 0; i < arrInput.length; i++){
            console.log('input',this.state[arrInput[i]])
            if (!this.state[arrInput[i]]){
                isValid = false;
                alert('Đối số không hợp lệ ' + arrInput[i]);
                break;
            }
        }
        return isValid
    }   

    handleSaveProduct = () => {
        let isValid = this.checkValideInput()
        if(isValid === false) return ;
        this.props.createNewproduct({
            product_name: this.state.product_name,
            image: this.state.image,
            description: this.state.description,

        })
    }

    openPreviewImage =() =>{
        this.setState({
            isOpen: true
        })

    }

    render() {
      
        let language = this.props.language;
        let { product_name , description } = this.state
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => {this.toggle()}} 
                className={'modal-Product-container'}
                size='lg'
                //centered
            >
                <ModalHeader toggle={() => {this.toggle()}}> <FormattedMessage id="manage-product.add"/></ModalHeader>
                <ModalBody>
                    <form className='form-create-edit'>
                        <div className="form-row">
                            <div className="input-container col-7 ">
                                <label><FormattedMessage id="manage-product.product_name"/></label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(e) => {this.handleOnChangeInput(e, 'product_name')}}
                                    value={product_name}
                                />
                            </div>
                            <div class="form-group col-md-5">
                                <label for=""> <FormattedMessage id="manage-product.image"/> </label>
                                <div className="preview-img-container">
                                    <input id="previewImg" type="file" hidden
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                    />
                                    <label className="upload-file" htmlFor="previewImg"><FormattedMessage id="common.upload-image"/> <i className="fas fa-upload"></i></label>
                                    <div className='preview-image'
                                        style ={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick= {() => this.openPreviewImage()}>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='form-row'>
                            <div class="form-group col-md-12">
                                <label for=""><FormattedMessage id="manage-product.description"/></label>
                                <input type="text" class="form-control" id="description" placeholder="1234 Main St"
                                    onChange={(e) => {this.handleOnChangeInput(e, 'description')}}
                                    value={description}
                                />
                            </div>
                        </div>
                        <button type="submit" class="btn btn-save" 
                            onClick = {() => this.handleSaveProduct()}
                            ><FormattedMessage id="manage-product.save"/>
                        </button>
                                
                        {this.state.isOpen === true &&
                            <Lightbox
                                mainSrc={this.state.previewImgURL}
                                onCloseRequest={() => this.setState({ isOpen: false })}
                            />
                        }
                    </form>
                </ModalBody>
                <ModalFooter>   
                    {/* <Button color="primary" className='px-2' onClick={() => {this.handleAddNewProduct()}}>Add new</Button>
                    <Button color="danger" className='px-2' onClick={() => {this.toggle()}}>Close</Button> */}
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalProduct);