const postsModel = require("./posts.model");
const groupsModel = require("../groups/groups.model");
const userModel = require("../users/users.model");

module.exports.createPost = createPost;
module.exports.getPosts = getPosts;

function createPost(req , res){
    const { groupID } = req.params;
    return groupsModel.findOne({
       _id : groupID
    }).then(group => {
        
    })
    .catch(e => res.json(500).json(e))
}