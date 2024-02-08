function Avatar({image,isOnline}) {
  return (
    <div className="avatar">
      <div className="avatar-img">
        <img src={image} alt="No image" />
      </div>
      <span className={`isOnline ${isOnline}`}></span>
    </div>
  );
}

export default Avatar;
