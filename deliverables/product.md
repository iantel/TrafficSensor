##PRODUCT
Team 23


#### Q1: What are you planning to build?


We are planning to build a mobile app that can be used by students to track the number of occupants in various study rooms and libraries on campus.

Libraries and study rooms can quickly fill up, especially during midterm and exam season, and may be quite spread out, causing a student looking for a place to study to waste time and energy searching for a place to sit and work. 

Our app will allow students to efficiently find a study space with enough room for them or their study group. They can simply look up their desired study space on our app and see the number of people currently there, then decide whether there’s enough room for them. If their first choice study room is full they can easily find another with less people using our app. This will save students time and physical effort by allowing them to check the space in study rooms from wherever they happen to be. 




#### Q2: Who are your target users?


Target users: Any student or group of students looking for study areas/rooms where there will be minimal noise/people, but are unsure which rooms (in buildings) meet these requirements. They don’t want to visit each building since this is a waste of time and effort, but they want the best area to settle down.

Tom, an upper year CS student at UofT, wants to study for the CSC458 midterm, his common study rooms include 3200 Bahen Centre, Basement of Gerstein, 14th or 2nd of Robarts, 3rd of LM. He doesn’t know which ones are crowded or not, he could make an educated guess, but being wrong in any situation could mean walking to test another building, which could lead to more wasted time, especially if the buildings are far apart.

User Profile: https://app.xtensio.com/folio/5ijb6pit

To our knowledge, there does not yet exist a “realtime” traffic monitoring system on U of T. To solve the problem mentioned above, most students use intuition and anecdotal evidence (e.g lunch time is the most crowded, most students have classes in the afternoon, not evening, personal patterns observed.), which could be inaccurate information (student could fail to account for on campus events at certain times, cannot predict the whims of other students and where they want to study for the day). The proposed system from a user's perspective would be a non-intrusive mobile application that requires only internet connection capabilities, and that aims to provide accurate and recent information regarding traffic. This saves the user time from having to relocate to another room, or having to settle for an unsatisfactory level of noisiness in their immediate area. It could also potentially let students discover new areas of low traffic to study inside.




####Q3 - Key Decisions

For the product, we had basically 2 big decisions. The first is concerning the method in which we detect traffic in each room. We either use a camera + computer vision to attempt to track upper body, head, or full body (whichever yields best results for us). The main drawback of this is that the results of the CV could be inaccurate, or too expensive to get accurate (more expensive camera = more detail when tracking). The simpler and cheaper alternative, would be using a combination of simple sensors (wifi probe to see # of devices, then attempt to extrapolate # of users, we could also use laser sensors to monitor the doors of the room.) On paper it sounds less accurate but we don’t know for sure yet.
The 2nd decision we made was for the user facing app, what stack to use. Since we want the app to be compatible on both devices, we are opting to work with a JS library (React) that will be cross compatible, which we think will result in less code, but still targeting IOS and Android devices.
