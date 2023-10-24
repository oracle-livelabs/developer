const setup = `
To create a Next application run the following command:
(For a short, nice Next.js course see Udemy class: https://www.udemy.com/course/nextjs13/learn/lecture/38252386#learning-tools)
 
npx create-next-app@latest
 
Answer the following questions accordingly:
 
✔ What is your project named? … mylab
✔ Would you like to use TypeScript with this project? … No / Yes select No
✔ Would you like to use ESLint with this project? … No / Yes select No
✔ Would you like to use Tailwind CSS with this project? … No / Yes select Yes
✔ Would you like to use 'src/' directory with this project? … No / Yes select No 
✔ Use App Router (recommended)? … No / Yes select Yes
? Would you like to customize the default import alias? › No / Yes select No
 
$ tree mylab/ | head -10
mylab/
├── app
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   └── page.js          <- landing page
├── jsconfig.json
├── next.config.js
├── node_modules
│   ├── @alloc
. . .
 
 ###### Here's an aside to show how to add more functionality to the app
    If the landing page contains a link to another page, e.g., href='/onr-sql'
    - Add a folder named onr-sql under app
    - Put a page.js in the new folder
    mylab/
    ├── app
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.js
    │   ├── onr-sql
    │   │   └── page.js      <- onr-sql page
    │   └── page.js          <- landing page with link to onr-sql page
    . . .

    If the new onr-sql page wants to fetch data from the database,
    - Add a database folder under app
    - Add a onr-sql folder under the new database folder
    - Put a router.js file in the onr-sql folder
    - Put the database query in the router.js file
    - in the onr-sq l page, make a fetch call to database/onr-sql (i.e., const resp = await fetch("database/onr-sql", { method: 'PUT'} );)
    mylab/
    ├── app
    │   ├── database
    │   │   └── onr-sql
    │   │       └── router.js   <- database call
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.js
    │   ├── onr-sql
    │   │   └── page.js      <- onr-sql page with database fetch call
    │   └── page.js          <- landing page with link to onr-sql page
    . . .
    
###### End aside
    
Now install a few packages:
 
cd mylab
npm install oracledb
npx shadcn-ui@latest init
npx shadcn-ui@latest add input
 
To run the applcation run th following command:
 
npm run dev
 
Or alternatively run:
npm run build
nohup npm run start &

`.replace(/[\r\n]+/g, "<br>")
export default setup;