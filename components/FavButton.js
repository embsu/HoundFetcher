import React, { useState, useEffect } from "react";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { saveLikedBreeds, getLikedBreeds } from './FavoriteManager';

const LikeButton = ({ breedLikedId, breedLikedName, likedBreeds }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const likedBreeds = await getLikedBreeds();
        const isLiked = likedBreeds.some((breed) => breed.id === breedLikedId);
        setLiked(isLiked);
      } catch (error) {
        console.log('Error fetching liked breeds:', error);
      }
    };

    fetchData();
  }, [breedLikedId, likedBreeds]);

  const toggleLike = async () => {
    if (!breedLikedName) {
      console.log('Cannot add breed with undefined or null name to liked breeds');
      return;
    }

    setLiked((prevLiked) => !prevLiked); // Toggle the liked state

    try {
      const likedBreeds = await getLikedBreeds();
      if (liked) {
        // Remove the breed from likedBreeds if it's already liked
        const updatedLikedBreeds = likedBreeds.filter((breed) => breed.id !== breedLikedId);
        await saveLikedBreeds(updatedLikedBreeds);
        console.log('Removed breed from likedBreeds:', breedLikedId, breedLikedName);
      } else {
        // Add the breed to likedBreeds
        const updatedLikedBreeds = [...likedBreeds, { id: breedLikedId, name: breedLikedName }];
        await saveLikedBreeds(updatedLikedBreeds);
        console.log('Added breed to likedBreeds:', breedLikedId, breedLikedName);
      }
    } catch (error) {
      console.log('Error toggling like:', error);
    }
  };

  return (
    <Pressable onPress={toggleLike}>
      <MaterialCommunityIcons
        name={liked ? 'heart' : 'heart-outline'}
        size={32}
        color={liked ? '#CD5851' : '#78767B'}
      />
    </Pressable>
  );
};

export default LikeButton;