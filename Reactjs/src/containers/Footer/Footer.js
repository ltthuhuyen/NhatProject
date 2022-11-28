import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import * as MdIcons from "react-icons/md";
import * as BiIcons from "react-icons/bi";
import "./Footer.scss";
class Footer extends Component {
  render() {
    return (
      <div className="bg-footer">
        <div className="title-footer">
          Chúng tôi thu gom , Chúng tôi quan tâm
        </div>
        <div className="row">
          <div className="col-4 my-3">
            <h5 className="title">VĂN PHÒNG TẠI CẦN THƠ</h5>
            <p className="content">
              <FiIcons.FiMapPin className="icon" /> Địa chỉ: Số 67/2 đường Mậu
              Thân, quận Ninh Kiều, Cần Thơ
            </p>
            <p className="content">
              <BsIcons.BsTelephone className="icon" /> Hotline: 0292.2929.762
            </p>
            <p className="content">
              <MdIcons.MdOutlineMail className="icon mt-1" /> Email:
              recycle_collection@gmail.com
            </p>
            <p className="content">
              <BiIcons.BiTimeFive className="icon mt-1" /> Giờ làm việc:
              7h30-11h30 : 13h30-17h30
            </p>
          </div>
          <div className="col-3 my-3 ml-4">
            <h5 className="title">GIỚI THIỆU</h5>
            <p className="content">
              <Link to="" className="link">
                Việt Nam Thu Gom
              </Link>
            </p>
            <p className="content">
              <Link to="" className="link">
                Quy Trình Thu Gom
              </Link>
            </p>
            <h5 className="title mt-5">KẾT NỐI VỚI CHÚNG TÔI</h5>
            <div className="icon-contact">
              <BsIcons.BsFacebook className="mr-2" />
              <BsIcons.BsInstagram className="mr-2" />
              <BsIcons.BsTwitter className="mr-2" />
              <BsIcons.BsYoutube className="mr-2" />
            </div>
          </div>
          {/* <div className="col-2 my-3 ml-4">
            <h5 className="title">HOẠT ĐỘNG</h5>
            <p className="content">
              <Link to="" className="link">
                Tin Tức
              </Link>
            </p>
            <p className="content">
              <a href="">Phương Thức Thanh Toán</a>
            </p>
            <p className="content">
              <a href="">Điểm Thưởng</a>
            </p>
          </div> */}
          {/* <div className="col-2 my-3 ml-5">
            <h5 className="title">KẾT NỐI VỚI CHÚNG TÔI</h5>
            <div className="icon-contact">
              <BsIcons.BsFacebook className="mr-2" />
              <BsIcons.BsInstagram className="mr-2" />
              <BsIcons.BsTwitter className="mr-2" />
              <BsIcons.BsYoutube className="mr-2" />
            </div>
          </div> */}
          <div className="col-4">
            <div>
              <iframe
                width="520"
                height="260"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                id="gmap_canvas"
                src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=Đại học Cần Thơ&amp;q= Số 67/2 đường Mậu Thân, quận Ninh Kiều, Cần Thơ&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                // src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=Đại học Cần Thơ&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              ></iframe>
              {/* <a href="https://maps-generator.com/">Maps Generator</a> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
