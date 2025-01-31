import Button from "../common/Button";
import './bannerContainer.css'

const BannerContainer = ({ imgPath='',children, title, btnAction=()=>{}, btnTitle, btnLink='', hasBannerFooter=true }) => {
  return (
    <section className="banner-container">
      <div className="banner-header">
        <div>{title}</div>
        {btnTitle && <Button title={btnTitle} callback={btnAction} link={btnLink}/>}
      </div>
      {imgPath && <img src={imgPath} />}
      <div className={hasBannerFooter ? "banner-footer": ""}>{children}</div>
    </section>
  );
};
export default BannerContainer;
