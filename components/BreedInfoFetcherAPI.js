// import React, { useState, useEffect } from "react";
// import { ActivityIndicator } from "react-native-paper";

// const BreedInfoFetcher = ({ selBreedId, breedName, children }) => {
//   const [breedInfo, setBreedInfo] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [imageIndex, setImageIndex] = useState(0)

//   useEffect(() => {
//     setIsLoading(true)
//     console.log('API KOMPONENTISSA OLLAAN:', selBreedId, breedName)
//     fetch(`https://api.thedogapi.com/v1/images/search?limit=10&breed_ids=${selBreedId}
//         &api_key=${api.key}`)
//       .then(response => response.json())
//       .then(json => {
//         //laitetaan kaikki yhteen stateen
//         setBreedInfo({
//           breedImage: json.map(image => image.url),
//           breedGroup: json[0].breeds[0].breed_group,
//           breedTemperament: json[0].breeds[0].temperament,
//           breedLifeSpan: json[0].breeds[0].life_span,
//           breedWeight: json[0].breeds[0].weight.metric,
//           breedHeight: json[0].breeds[0].height.metric,
//           breedOrigin: json[0].breeds[0].origin,
//           breedBredFor: json[0].breeds[0].bred_for,

          
//         });
//         setIsLoading(false)
//       })


//       .catch(error => {
//         console.error('Error fetching breed info:', error);
//         setIsLoading(false)
//       }
//       );

//   }, [selBreedId]);

//   const handleNextImage = () => {
//     setImageIndex((prevIndex) => (prevIndex + 1) % breedImage.length);
//   };
//   const handlePrevImage = () => {
//     setImageIndex((prevIndex) => (prevIndex - 1 + breedImage.length) % breedImage.length);
//   };

//   if (isLoading) {
//     return <ActivityIndicator size="large" color="#AE8781" />;
//   }
//   return children({ breedInfo, isLoading, imageIndex, handleNextImage, handlePrevImage});
// };

// export default BreedInfoFetcher;
