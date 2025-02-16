# Geo Router Extension

## Description

`geo-router-extension` is a React Router extension that enables geo-based routing. It allows you to define routes with a `geoLocation` key that specifies location-based access. If the user's location does not match, the component will navigate to a default fallback route.

## Features

- 🌍 **Geo-based Routing**: Define routes that only render for specific geographic locations.
- 🔄 **Fallback Support**: If the user's location does not match, the component automatically falls back to a default route.
- 📦 **Local Storage Caching**: Caches user location data to prevent unnecessary API calls.
- 🛠 **Custom Geo Data Fetching**: Pass a custom function to fetch user location data instead of the default API.

## Installation

```sh
npm install geo-router-extension
```

or using yarn:

```sh
yarn add geo-router-extension
```

## Usage

### Basic Example

```jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import GeoRender from "geo-router-extension";
import HomePage from "./HomePage";
import USPage from "./USPage";
import CanadaPage from "./CanadaPage";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/us", element: <USPage />, geoLocation: { country: "US" } },
  { path: "/canada", element: <CanadaPage />, geoLocation: { country: "CA" } },
];

const App = () => (
  <BrowserRouter>
    <GeoRender routes={routes} />
  </BrowserRouter>
);

export default App;
```

### Using a Custom Geo Fetcher

```jsx
const customGeoFetcher = async () => {
  return { country: "US", city: "New York" }; // Example custom geo data
};

<GeoRender routes={routes} getGeoData={customGeoFetcher} />;
```

### Using a Custom Loading Page/Element

```jsx
<GeoRender routes={routes} loadingElement={<LoadingPage />} />;
```

## API

### `<GeoRender />`

| Prop         | Type       | Description                                                                |
| ------------ | ---------- | -------------------------------------------------------------------------- |
| `routes`     | `Array`    | List of route objects with path, element, and optional `geoLocation`.      |
| `getGeoData` | `Function` | (Optional) Custom function to fetch user geo data. Defaults to `ipapi.co`. |
| `loadingElement` | `JSX.Element` | (Optional) Custom loading element to display while fetching geo data. |

### Route Object Structure

```ts
{
  path: string;
  element: JSX.Element;
  name?: string;
  geoLocation?: {
    country?: string;
    city?: string;
    zip?: string;
  };
}
```

## Error Handling

- You can define a matching route for any route that has a `geoLocation` key. If the user's location does not match 
  or no location data is available, 
  the component will automatically navigate to the default route. Otherwise, the component will redirect to '/'.

## License

MIT

