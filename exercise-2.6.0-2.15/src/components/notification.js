const Notification = ({message}) =>{
    if(message === null){
        return null
    }
    return(
        <div className="task">
            {message}
        </div>
    )
}

export default Notification;