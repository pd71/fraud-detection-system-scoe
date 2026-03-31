from fastapi import APIRouter

router = APIRouter()

posts = []
post_id_counter = 1

@router.post("/post")
def create_post(title: str, description: str, type: str, content: str):
    global post_id_counter

    post = {
        "id": post_id_counter,
        "title": title,
        "description": description,
        "type": type,
        "content": content,
        "upvotes": 0
    }

    posts.append(post)
    post_id_counter += 1

    return post


@router.get("/posts")
def get_posts():
    return posts


@router.post("/upvote/{post_id}")
def upvote(post_id: int):
    for post in posts:
        if post["id"] == post_id:
            post["upvotes"] += 1
            return {"upvotes": post["upvotes"]}

    return {"error": "Post not found"}