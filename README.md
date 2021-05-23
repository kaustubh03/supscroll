# SuperCurl - Library for Scrolling Carousel

##### Now implement scrolling carousel on your frontend apps quickly.

###### Current Version - v1.0.6

# Usage
This can be used in 2 ways
### Vanilla JS
- Add Script to your webpage using CDN -
```
    <script src="https://cdn.jsdelivr.net/npm/supscroll@1.0.4/script.js"></script>
```

- Add Styles to your page head using CDN
```
    <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/supscroll@1.0.4/carousel.css" 
    />
```

- Initiate Initializers
    ```
    // On DOMContentLoad complete
    document.addEventListener("DOMContentLoaded", function (event) {
        let elem = document.querySelector('.supscroll .supscroll-wrapper');
        supscroll(elem);
    });
    ```
### Using NPM Module
- Install package via npm or yarn
    ```
        // for npm 
            npm install supscroll
        // for yarn
            yarn add supscroll
    ```
- Import supscroll and styles into your file
    ```
        import { supscroll } from "supscroll";
        import 'supscroll/carousel.css';
    ```
    
### Common Step - 
- Add Markup to your frontend code, Supscroll expects markup like below
    ```
     <div class="supscroll">
        <div class="supscroll-wrapper">
            <a href="#">
               <!-- Your Custom HTML -->
            </a> // Repeat it n times
        </div>
    </div>
    ```
Note - For React this would be JSX and similar suited variations for other FE Frameworks 
<<<<<<< HEAD
Styles can be overrided using external in-app stylesheets
=======
>>>>>>> 5f744c4d0d69fc97c31502b1b1c1a1bc27444b23
