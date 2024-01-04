import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

const PostAuthor = ({userId}) => {
    
    //const uId = userId.toString()
    const users = useSelector(selectAllUsers)
    console.log('selectAllUsers in POSTAUTHOR', users);
    console.log('userId in POSTAUTHOR', userId);
    

    const author = users.find(user => user.id === userId)

    return <span>by {author ? author.name : 'Unknown author'}</span>
}

export default PostAuthor