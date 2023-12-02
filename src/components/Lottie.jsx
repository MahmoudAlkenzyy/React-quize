function Lottie({ src = '', width = '70', height = '70', margin }) {
    return (
        <dotlottie-player
            src={src}
            background="transparent"
            speed="1"
            style={{
                width: `${width}px`,
                height: `${height}px`,
                margin: `${margin}`,
                marginTop: '2px',
            }}
            loop
            autoplay
        ></dotlottie-player>
    )
}

export default Lottie
