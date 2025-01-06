# Task Manager (Java + React) - Microservice architecture
A task manager web app build using java spring boot, MySQL and React in a microservice architecture. User can login/register. It has an admin dashboard and user dashboard. Admin can create and assign tasks to users and User can provide submission for their tasks on completion. Admin can also review the submissions made by user and accept or reject suggestion and close the task.

### Features of this app
- Login, Logout and register functionality with jsonwebtoken authentication.
- Admin and user dashboard with separate features available based on role.
- Admin can create, edit, delete and assign task to user.
- Admin can review submissions made by user and accept or reject and can close the task.
- User can view the task assigned by the admin
- User can provide submissions for each task which will be sent to admin for review
- User can view the task moved to Done tab when submission is accepted or task is closed.
- Admin can view unassigned, assigned tasks by navigating to respective tabs.
- Admin can also view the task moved to Done when admin accept a submission.

<!-- ### Preview

[Watch the video here !](./preview/TASK%20MANAGER%20APP.mp4) -->


### Developed with

*Frontend*
- React
- react-dom
- react-router-dom
- axios
- tailwind css

*Backend*
- MySQl
- Java
- Spring boot 3
- Spring security
- JPA
- Eureka
- OpenFeign

