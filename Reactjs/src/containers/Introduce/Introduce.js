import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from "../../store/actions"
import banner2 from "../../assets/images/banner4.jpg"
import  './Introduce.scss'
class Introduce extends Component {
  
    render() {
    
        return (
            <div className='introduce'>
                <div className='title-introduce'>
                  <p> Chào mừng đến với</p>
                  Việt Nam Thu Gom
                </div>
                <div className='line'></div>
                <div className='row'>
                    <div className='col-7 content'>
                      <span className='row'>Việt Nam Thu Gom Hưởng Ứng Chiến Dịch “Làm Cho Thế Giới Sạch Hơn” 2022 là thu gom những vật không còn sử dụng, bị vứt bỏ nhưng vẫn còn khả năng tái chế. Thu ve chai tận nơi hay còn gọi là thu gom phế liệu không những giúp làm sạch môi trường mà còn giúp cho người thu gom có thêm thu nhập.</span>
                      <span className='row'>Các quán trà sữa , quán cafe mỗi ngày có rất nhiều ly nhựa thay vì bỏ ra ngoài môi trường thì họ có thể tặng lại cho người thu gom để kiếm thêm thu nhập và vừa giúp bảo vệ môi trường. Thế nhưng việc thu gom theo kiểu truyền thống lại gây khó khăn cho người cho và người nhận trong khi thời đại CNTT đang ngày một phát triển như hiện nay. Việt Nam Thu Gom, sẽ là nơi kết nối và giúp trao đổi việc thu gom giữa các quán trà sữa, quán cafe với người thu lượm ve chai</span>
                    </div>
                    <div className='col-5 img'>
                   
                      <img
                        className=" img-pro"
                        src={banner2}
                        alt="bn1"
                      />
         
                    </div>
                </div>
            </div>
            
             
        

        )
  }
}
const mapStateToProps = state => {
  return {
      userInfo: state.user.userInfo,
      temps: state.admin.temps,
      
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
      fetchAllTemp:(giverId) => dispatch(actions.fetchAllTemp(giverId)),

  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Introduce));
