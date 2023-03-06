function PhotoCred({ unSplashSource }) {
  return (
    <div style={{ position: 'absolute', bottom: 16, right: 100 }}>
      <a href={`${unSplashSource}`} target="none">Image Source</a>
    </div>
  )
}

export default PhotoCred