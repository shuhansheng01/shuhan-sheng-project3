# Sudoku+ Full-Stack Application Writeup (Project 3)

## Project Links
- **Application URL**: https://shuhan-sheng-project3.onrender.com/
- **GitHub Repo**: https://github.com/shuhansheng01/shuhan-sheng-project3
- **Demo Video**: https://youtu.be/HJh4mrwLrK4

---

## 💻 Writeup Questions Answered

### 1. What were some challenges you faced while making this app?

The most significant challenges were concentrated on **deployment stability** and **cross-domain authentication**, rather than the core application features:

1.  **Vite/esbuild Build Failures (Deployment)**: This was the most time-consuming issue. The esbuild compiler repeatedly threw the `Unterminated string literal` error during deployment. This was ultimately resolved by avoiding complex Template Literals and instead using traditional string concatenation in key files (like `Register.jsx`) to prevent the build environment from auto-wrapping and interrupting the string.
2.  **Cross-Origin Authentication (CORS & Cookies)**: Achieving reliable login/registration was a major hurdle. It required meticulously ensuring the Express backend had correct CORS settings (`credentials: true`) and that **all** critical frontend `axios` requests (login, register, and `/me` checks) included `{ withCredentials: true }`. This was the fix for the pages getting stuck in the "Logging In..." state.
3.  **Frontend Layout Uniformity**: The initial deployments suffered from a lack of global styling, causing all content (Login, Scores, etc.) to be aligned to the top-left corner. This was fixed by implementing centralized container classes and `margin: auto` in the global CSS, ensuring consistency across all routes.

### 2. Given more time, what additional features, functional or design changes would you make?

1.  **Functional Improvements (Bonus Points)**:
    * **Password Encryption**: I would implement bcrypt or a similar library to hash and encrypt user passwords in the database for better security.
    * **Custom Games**: Implement the custom game feature where users can input a board, which is then validated on the backend for unique solvability.
2.  **Design Improvements**:
    * **Full Responsiveness**: Optimize the Sudoku board component and main layout to ensure a seamless experience on various mobile screen sizes.
    * **Enhanced UI Feedback**: Add more polished visual feedback and animations for victory screens and during cell input validation.

### 3. What assumptions did you make while working on this assignment?

1.  **Game Logic**: I assumed the core Sudoku validation logic (checking rows, columns, and sub-grids) was implemented and functioning correctly within the frontend components (as inherited from Project 2), and the backend was primarily responsible for state storage.
2.  **Password Security**: I assumed the basis of the requirement allowed for current password storage, but noted that encryption is a required bonus point.

### 4. How long did this assignment take to complete?

The assignment took approximately **40 hours** to complete. This time was heavily skewed toward debugging the MERN stack integration, as over **25 hours** were dedicated specifically to resolving the complex deployment, CORS, and build issues that prevented the application from successfully launching and authenticating.

### 5. What bonus points did you accomplish?

* **Completed Bonus Points:**
    * **Delete Game Feature (5 pts)**: Implemented via the `DELETE /api/sudoku/:id` route, allowing users to remove games from their list.
* **Uncompleted Bonus Points (Functionality)**:
    * Submit Early
    * Password Encryption
    * Custom Games Feature

---
