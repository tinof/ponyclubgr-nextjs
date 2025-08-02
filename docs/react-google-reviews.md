# [React Google Reviews](https://featurable.com/docs/react-google-reviews#undefined)

![React Google Reviews Component Library](https://featurable.com/docs/images/react-google-reviews.jpg)

The `react-google-reviews` library makes it easy to fetch and display Google reviews using ReactJS. The library is built on top of the Featurable API and provides a simple way to fetch and display Google reviews on your website. You can also use the Google Places API and your own API key instead of the Featurable API. In this guide we will show you how to get started with the `react-google-reviews` library.

## [Features](https://featurable.com/docs/react-google-reviews#features)

-   **Customizable:** Choose from three layout options and customize the appearance of the reviews component
-   **SEO-friendly:** Include JSON-LD structured data for search engines to index your reviews
-   **Responsive:** Works on all devices and screen sizes
-   **Fast:** Caches reviews for quick loading and improved performance
-   **Free:** No cost to use the Featurable API for fetching reviews
-   **Fresh:** Automatically updates with new reviews from Google every 24 hours (using Featurable API)
-   **Accessible:** Built with accessibility in mind (WAI-ARIA compliant)
-   **Easy**: Using the Featurable API, you can fetch reviews with just a few lines of code (no server-side code required)

## [Live Demo](https://featurable.com/docs/react-google-reviews#live-demo)

Here is what the `react-google-reviews` component looks like when integrated into a React application:

### Carousel layout

PreviewCode

![](https://featurable.com/docs/react-google-reviews)

D

David W.

1 day ago

I was skeptical at first, but after using this product for a while, I'm a believer. It's well-designed, durable, and does exactly what it's supposed to do. I couldn't be happier with my purchase.

![](https://featurable.com/docs/react-google-reviews)

J

Jessica B.

1 day ago

I love this product! It has exceeded my expectations in every way. Setup was a breeze and it works flawlessly. I've already recommended it to several friends and family members.

![](https://featurable.com/docs/react-google-reviews)

I

Isabella H.

1 day ago

I was hesitant to invest in this product at first, but I'm so glad I did. It has been a total game-changer for me and has made a significant positive impact on my work. It's worth every penny.

![](https://featurable.com/docs/react-google-reviews)

S

Sophia M.

1 day ago

I've tried similar products in the past, but none of them compare to this one. It's in a league of its own in terms of functionality, durability, and overall value. I can't recommend it highly enough!

![](https://featurable.com/docs/react-google-reviews)

J

John D.

1 day ago

This product is a game-changer! I've been using it for a few months now and it has consistently delivered excellent results. It's easy to use, well-designed, and built to last.

![](https://featurable.com/docs/react-google-reviews)

E

Emily D.

1 day ago

I've been using this product for a few weeks now and I'm blown away by how well it works. It's intuitive, easy to use, and has already saved me a ton of time. I can't imagine going back to the way I...

Read more

![](https://featurable.com/docs/react-google-reviews)

D

David W.

1 day ago

I was skeptical at first, but after using this product for a while, I'm a believer. It's well-designed, durable, and does exactly what it's supposed to do. I couldn't be happier with my purchase.

![](https://featurable.com/docs/react-google-reviews)

J

Jessica B.

1 day ago

I love this product! It has exceeded my expectations in every way. Setup was a breeze and it works flawlessly. I've already recommended it to several friends and family members.

![](https://featurable.com/docs/react-google-reviews)

I

Isabella H.

1 day ago

I was hesitant to invest in this product at first, but I'm so glad I did. It has been a total game-changer for me and has made a significant positive impact on my work. It's worth every penny.

![](https://featurable.com/docs/react-google-reviews)

S

Sophia M.

1 day ago

I've tried similar products in the past, but none of them compare to this one. It's in a league of its own in terms of functionality, durability, and overall value. I can't recommend it highly enough!

![](https://featurable.com/docs/react-google-reviews)

J

John D.

1 day ago

This product is a game-changer! I've been using it for a few months now and it has consistently delivered excellent results. It's easy to use, well-designed, and built to last.

![](https://featurable.com/docs/react-google-reviews)

E

Emily D.

1 day ago

I've been using this product for a few weeks now and I'm blown away by how well it works. It's intuitive, easy to use, and has already saved me a ton of time. I can't imagine going back to the way I...

Read more

![](https://featurable.com/docs/react-google-reviews)

D

David W.

1 day ago

I was skeptical at first, but after using this product for a while, I'm a believer. It's well-designed, durable, and does exactly what it's supposed to do. I couldn't be happier with my purchase.

![](https://featurable.com/docs/react-google-reviews)

J

Jessica B.

1 day ago

I love this product! It has exceeded my expectations in every way. Setup was a breeze and it works flawlessly. I've already recommended it to several friends and family members.

-   1
-   2
-   3
-   4
-   5
-   6

### Badge layout

PreviewCode

Google Rating

5.0

★★★★★

★★★★★

Read our 123 reviews

## [Installation](https://featurable.com/docs/react-google-reviews#installation)

To get started with the `react-google-reviews` library, you need to install it using [npm](https://npmjs.com/package/react-google-reviews).

### Installation

npmyarnpnpm

    npm install react-google-reviews
    

CopyCopied!

## [Usage](https://featurable.com/docs/react-google-reviews#usage)

There are two ways to use the React Google Reviews library:

1.  Using the **Featurable API** (recommended)
    
2.  Using the **Google Places API.**
    

We recommend using the Featurable API for fetching reviews, as it provides more features, better performance, and is entirely free.

But if you prefer not to use the Featurable API, you can use the Google Places API with your own API key. This method is limited to fetching only the first 5 reviews from Google.

The Featurable API method is entirely free, while the Google Places API method requires a Google Cloud Platform account and may incur costs at scale.

### Using the Featurable API (recommended)

The Featurable API offers a free and easy method of using the `<ReactGoogleReviews />` component. It requires no server-side code and automatically fetches new reviews from Google every 24 hours.

Using the Featurable API, you also do not need to find the Google Place ID, which can be especially helpful for businesses without a physical address.

#### Prerequisites:

1.  Create your free Featurable account at [https://featurable.com](https://featurable.com/account/signup)
2.  Create a new Featurable widget and copy the widget ID

### Using component with Featurable API

    import { ReactGoogleReviews } from "react-google-reviews";
    import "react-google-reviews/dist/index.css";
    
    function Reviews() {
      // Create a free Featurable account at https://featurable.com
      // Then create a new Featurable widget and copy the widget ID
      const featurableWidgetId = "842ncdd8-0f40-438d-9c...";
    
      return (
        <ReactGoogleReviews layout="carousel" featurableId={featurableWidgetId} />
      );
    }
    

CopyCopied!

### Using the Google Places API (limited to 5 reviews)

If you prefer to use the Google Places API, you can fetch reviews using your own API key. This method is limited to fetching only the first 5 reviews from Google and requires server-side code to avoid exposing your API key.

#### Prerequisites:

1.  Create a Google Cloud Platform account at [https://cloud.google.com](https://cloud.google.com/)
2.  Create a new project and enable the Google Places API **(old version)**
3.  Find your business's Google Place ID using the [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)

### Using component with Google Places API

    import { ReactGoogleReviews, dangerouslyFetchPlaceReviews, ReactGoogleReview } from "react-google-reviews";
    import "react-google-reviews/dist/index.css";
    
    /**
     * Example using NextJS page router
     */
    async function ReviewsPage({
      reviews
    }, {
      reviews: ReactGoogleReview[]
    }) {
      return (
        <ReactGoogleReviews layout="badge" reviews={reviews} />
      );
    }
    
    export default ReviewsPage;
    
    export const getServerSideProps = async () => {
      const placeId = "ChIJN1t_tDeuEmsRU..."; // Google Place ID
      const apiKey = "AIzaSyD..."; // Google API Key
    
      // IMPORTANT: Only fetch reviews server-side to avoid exposing API key
      const reviews = await dangerouslyFetchPlaceReviews(placeId, apiKey)
    
      return {
        props: {
          reviews,
        }
      }
    }
    

CopyCopied!

If using NextJS, the `<ReactGoogleReviews />` component should be wrapped in a client component because it uses client-side hooks.

## [Configuration](https://featurable.com/docs/react-google-reviews#configuration)

The `<ReactGoogleReviews />` component has a variety of configuration options and pre-built layouts. You can also pass a custom renderer function to customize the appearance of the reviews.

### Layout

There are three layout options currently available:

1.  **Badge**: Display a badge with the average rating, total reviews, and link to Google Business profile

### Badge layout

     <ReactGoogleReviews layout="badge" featurableId={featurableWidgetId} />
    

CopyCopied!

![Badge Layout](https://featurable.com/docs/images/badge-example.png)

2.  **Carousel**: An interactive carousel that displays reviews

### Carousel layout

     <ReactGoogleReviews layout="carousel" featurableId={featurableWidgetId} />
    

CopyCopied!

![Carousel Layout](https://featurable.com/docs/images/carousel-example.png)

3.  **Custom renderer**: Render reviews using a custom function

### Custom renderer layout

    <ReactGoogleReviews layout="custom" featurableId={featurableWidgetId} renderer={(reviews) => {
      return (
        <div>
          {reviews.map(({ reviewId, reviewer, comment }) => (
            <div key={reviewId}>
              <h3>{reviewer.displayName}</h3>
              <p>{comment}</p>
            </div>
          ))}
        </div>
      );
    }} />
    

CopyCopied!

## [CSS Classes](https://featurable.com/docs/react-google-reviews#css-classes)

The `<ReactGoogleReviews />` component uses the Block Element Modifier (BEM) naming convention for CSS classes. You can override stylings by supplying a stylesheet that uses these selectors.

### Carousel Classes

-   Name
    
    `.carousel`
    
    Description
    
    Main carousel container
    
-   Name
    
    `.carousel__btn`
    
    Description
    
    Button to scroll carousel
    
-   Name
    
    `.carousel__btn--left`
    
    Description
    
    Left (previous) carousel button
    
-   Name
    
    `.carousel__btn--right`
    
    Description
    
    Right (next) carousel button
    
-   Name
    
    `.carousel__btn--light`
    
    Type
    
    default
    
    Description
    
    Light theme carousel button
    
-   Name
    
    `.carousel__btn--dark`
    
    Description
    
    Dark theme carousel button
    
-   Name
    
    `.carousel__btn__icon`
    
    Description
    
    SVG chevron icon for carousel button
    
-   Name
    
    `.carousel__card`
    
    Description
    
    Container for carousel review card
    
-   Name
    
    `.slick-dots > li > button::before`
    
    Description
    
    Carousel slider dots
    
-   Name
    
    `.slick-dots > li.slick-active > button::before`
    
    Description
    
    Carousel slider dots active state
    

### Badge Classes

-   Name
    
    `.badge`
    
    Description
    
    Main badge container
    
-   Name
    
    `.badge__container`
    
    Description
    
    Inner container for badge
    
-   Name
    
    `.badge__container--light`
    
    Type
    
    default
    
    Description
    
    Light theme inner container for badge
    
-   Name
    
    `.badge__container--dark`
    
    Description
    
    Dark theme inner container for badge
    
-   Name
    
    `.badge__subcontainer`
    
    Description
    
    Inner container for badge text
    
-   Name
    
    `.badge__label`
    
    Description
    
    "Google Rating" badge label
    
-   Name
    
    `.badge__label--light`
    
    Type
    
    default
    
    Description
    
    Light theme for badge label
    
-   Name
    
    `.badge__label--dark`
    
    Description
    
    Dark theme for badge label
    
-   Name
    
    `.badge__rating__container`
    
    Description
    
    Badge container for rating and stars
    
-   Name
    
    `.badge__rating`
    
    Description
    
    Rating text (e.g. 4.8)
    
-   Name
    
    `.badge__rating--light`
    
    Type
    
    default
    
    Description
    
    Light theme for rating text
    
-   Name
    
    `.badge__rating--dark`
    
    Description
    
    Dark theme for rating text
    
-   Name
    
    `.badge__stars`
    
    Description
    
    Container for star icons
    
-   Name
    
    `.badge__stars__container`
    
    Description
    
    Inner container for star icons
    
-   Name
    
    `.badge__stars__fill`
    
    Description
    
    Filled state for star icons
    
-   Name
    
    `.badge__stars__empty`
    
    Description
    
    Empty state for star icons
    
-   Name
    
    `.badge__link__container`
    
    Description
    
    Container for "Read our \_\_ reviews" profile link
    
-   Name
    
    `.badge__link`
    
    Description
    
    The "Read our \_\_ reviews" profile link
    
-   Name
    
    `.badge__link--light`
    
    Type
    
    default
    
    Description
    
    Light theme for badge profile link
    
-   Name
    
    `.badge__link--dark`
    
    Description
    
    Dark theme for badge profile link
    

## [Props](https://featurable.com/docs/react-google-reviews#props)

The `<ReactGoogleReviews />` component accepts the following props:

### Common Props

-   Name
    
    `featurableId`
    
    Type
    
    string
    
    Description
    
    Featurable widget ID
    
-   Name
    
    `reviews`
    
    Type
    
    ReactGoogleReview\[\]
    
    Description
    
    Array of reviews to display, fetched using `dangerouslyFetchPlaceReviews`
    
-   Name
    
    `layout`
    
    Type
    
    "badge" | "carousel" | "custom"
    
    Description
    
    Array of reviews to display, fetched using `dangerouslyFetchPlaceReviews`
    
-   Name
    
    `nameDisplay?`
    
    Type
    
    "fullNames" | "firstAndLastInitials" | "firstNamesOnly"
    
    Description
    
    How to display names on reviews. Default: "firstAndLastInitials"
    
-   Name
    
    `logoVariant?`
    
    Type
    
    "logo" | "icon" | "none"
    
    Description
    
    How to display the Google logo. Default: "icon"
    
-   Name
    
    `maxCharacters?`
    
    Type
    
    number
    
    Description
    
    When collapsed, the maximum number of characters to display in the review body. Default: 200
    
-   Name
    
    `dateDisplay?`
    
    Type
    
    "relative" | "absolute"
    
    Description
    
    How to display the review date. Default: "relative"
    
-   Name
    
    `reviewVariant?`
    
    Type
    
    "card" | "testimonial"
    
    Description
    
    Review layout variations. Default: "card"
    
-   Name
    
    `theme?`
    
    Type
    
    "light" | "dark"
    
    Description
    
    Color scheme of the component. Default: "light"
    
-   Name
    
    `structuredData?`
    
    Type
    
    boolean
    
    Description
    
    Whether to include JSON-LD structured data for SEO
    
-   Name
    
    `structuredData?`
    
    Type
    
    boolean
    
    Description
    
    Whether to include JSON-LD structured data for SEO. Default: false
    
-   Name
    
    `brandName?`
    
    Type
    
    string
    
    Description
    
    Custom business name for structured data
    
-   Name
    
    `productName?`
    
    Type
    
    string
    
    Description
    
    Custom product name for structured data
    
-   Name
    
    `productDescription?`
    
    Type
    
    string
    
    Description
    
    Optional product description for structured data
    
-   Name
    
    `accessibility?`
    
    Type
    
    boolean
    
    Description
    
    Enable/disable accessibility features. Default: true
    
-   Name
    
    `totalReviewCount?`
    
    Type
    
    number
    
    Description
    
    Total number of reviews on Google Business profile. This is automatically fetched if using `featurableId`. Otherwise, this is required if passing reviews manually and `structuredData` is true.
    
-   Name
    
    `averageRating?`
    
    Type
    
    number
    
    Description
    
    Average rating for Google Business profile. This is automatically fetched if using `featurableId`. Otherwise, this is required if passing reviews manually and `structuredData` is true.
    

### Carousel Props

-   Name
    
    `carouselSpeed`
    
    Type
    
    number
    
    Description
    
    Autoplay speed of the carousel in milliseconds. Default: 3000
    
-   Name
    
    `carouselAutoplay`
    
    Type
    
    boolean
    
    Description
    
    Whether to autoplay the carousel. Default: true
    
-   Name
    
    `maxItems`
    
    Type
    
    number
    
    Description
    
    Maximum number of items to display at any one time in carousel. Default: 3
    

### Badge Props

-   Name
    
    `profileUrl`
    
    Type
    
    string
    
    Description
    
    Link to Google Business profile, if manually fetching reviews via Place API. Using Featurable API will automatically supply this URL.
    

## [License](https://featurable.com/docs/react-google-reviews#license)

This project is licensed under the MIT License. By using the Featurable API, you agree to the [Featurable Terms of Service](https://featurable.com/terms).

## [Acknowledgements](https://featurable.com/docs/react-google-reviews#acknowledgements)

This library uses [`slick-carousel`](https://github.com/kenwheeler/slick) and [`react-slick`](https://github.com/akiran/react-slick) for the carousel layout.