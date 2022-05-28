let course = {
    _id: 1,
    course_code: "CSC8011",
    course_name: "Introduction to Software Development",
    description: "",
    bg_color: 1,
}

let blog_category = {
    _id: 1,
    category_name: "leisure",
    description: "",
    bg_color: 1
}

let subtopic1 = {
    _id: 1,
    subtopic_name: "Programs, programming, programming environments",
    description: "",
    resources: [
        {
            title: "Java setup", 
            link: "https://www.youtube.com/watch?v=FjGMYpXS9iE"
        }, 
        {
            title: "Programs and Programming Languages", 
            link: "https://www.youtube.com/watch?v=-C88r0niLQQ"
        }
    ],
    course: 1
}

let subtopic2 = {
    _id: 2,
    subtopic_name: "Introduction to tooling for version control",
    description: "",
    resources: [
        {
            title: "Git and github", 
            link: "https://www.youtube.com/watch?v=SWYqp7iY_Tc"
        }, 
    ],
    course: 1
}

let blog1 = {
    _id: 1,
    blog_name: "How to better prepare your interview",
    blog_content: "",
    likes_quantity: "",
    created_date:"",
    blog_category: 1,
    user_id: 1
}

let guide1 = {
    _id: 1,
    guide_name: "Something about IntelliJ Idea setup",
    guide_content: "",
    guide_question: [
        {
            question: "Do you know how to perform git operation on IntelliJ?",
            answer: "Simply click the icon on the top-right corner, there should be pull, commit and push"
        }
    ],
    likes_quantity: "",
    created_date:"",
    course_subtopic: 1,
    user_id: 1
}

let user = {
    _id: 1,
    email: "peteto1213@gmail.com",
    password: "12345",
    first_name: "Pete",
    last_name: "To",
    activation_status: "active",
    user_type: 1
}