import React, { Component } from 'react';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import './Footer.scss'
class Footer extends Component {
    render() {
        return (
            <div className='bg-footer'>
                <div className="row">
                <div className="col-3 my-3">
                    <h5>THÔNG TIN CÔNG TY</h5>
                    <p><a href="">Giới Thiệu</a></p>
                </div>
                <div className="col-3 my-3">
                    <h5>HỖ TRỢ KHÁCH HÀNG</h5>
                    <p><a href="">Hướng Dẫn Trở Thành Thành Viên</a></p>
                </div>
                <div className="col-3 my-3">
                    <h5>DỊCH VỤ KHÁCH HÀNG</h5>
                    <p><a href="">Liên Hệ Với Chúng Tôi</a></p>
                    <p><a href="">Phương Thức Thanh Toán</a></p>
                    <p><a href="">Điểm Thưởng</a></p>
                </div>
                <div className="col-3 my-3">
                    <h5>KẾT NỐI VỚI CHÚNG TÔI</h5>
                    <div className='icon-contact'>
                    <BsIcons.BsFacebook/>
                    <BsIcons.BsInstagram/>
                    <BsIcons.BsTwitter/>
                    <BsIcons.BsYoutube/>
                    </div>
                </div>
                </div>
            </div>

        )
    }
    
}
    
export default (Footer);