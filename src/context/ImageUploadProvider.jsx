import React, {createContext, useState, useContext} from 'react';

// Create context for image upload
const ImageUploadContext = createContext();

// Initial state for uploaded images
const initialState = [
  {
    id: 1,
    name: 'Top',
    mainImage: require('../../assets/images/top.png'),
    smallImage: require('../../assets/images/small_top.png'),
    globalImage: null,
    closeupImage: null,
    isLoading: false,
    isFocus: true, // Indicate whether this image is currently focused
  },
  {
    id: 2,
    name: 'Left',
    mainImage: require('../../assets/images/left.png'),
    smallImage: require('../../assets/images/small_left.png'),
    globalImage: null,
    closeupImage: null,
    isLoading: false,
    isFocus: false,
  },
  {
    id: 3,
    name: 'Frontal',
    mainImage: require('../../assets/images/front.png'),
    smallImage: require('../../assets/images/small_front.png'),
    globalImage: null,
    closeupImage: null,
    isLoading: false,
    isFocus: false,
  },
  {
    id: 4,
    name: 'Right',
    mainImage: require('../../assets/images/right.png'),
    smallImage: require('../../assets/images/small_right.png'),
    globalImage: null,
    closeupImage: null,
    isLoading: false,
    isFocus: false,
  },
];

// ImageUploadProvider component
export const ImageUploadProvider = ({children}) => {
  // State variables
  const [uploadedImages, setUploadedImages] = useState(initialState);
  const [showCamera, setShowCamera] = useState(false);

  // Find the currently focused pose
  const currentPose = uploadedImages.find(pose => pose.isFocus);

  // Count the number of global and close-up images
  const globalImageCount = uploadedImages.filter(
    pose => pose.globalImage !== null,
  ).length;
  const closeupImageCount = uploadedImages.filter(
    pose => pose.closeupImage !== null,
  ).length;

  // Function to upload image
  const uploadImage = async (uri, isGlobal = true) => {
    const poseId = currentPose.id;

    // Set loading state when uploading image
    setUploadedImages(prevState => {
      return prevState.map(pose => {
        if (pose.id === poseId) {
          return {
            ...pose,
            [isGlobal ? 'globalImage' : 'closeupImage']: uri,
            isLoading: true,
          };
        }
        return pose;
      });
    });

    // Simulate delay and then set loading state back to false
    setTimeout(() => {
      setUploadedImages(prevState => {
        return prevState.map(pose => {
          if (pose.id === poseId) {
            return {
              ...pose,
              isLoading: false,
            };
          }
          return pose;
        });
      });
    }, 2000);
  };

  // Function to update current pose
  const updateCurrentPose = poseId => {
    // Hide camera when updating current pose
    setShowCamera(false);

    // Set the new current pose
    setUploadedImages(prevState =>
      prevState.map(pose => ({
        ...pose,
        isFocus: pose.id === poseId,
      })),
    );
  };

  const resetUploadedImages = () => {
    setUploadedImages(initialState);
  };

  // Context value
  const value = {
    uploadedImages,
    setUploadedImages,
    updateCurrentPose,
    uploadImage,
    currentPose,
    globalImageCount,
    closeupImageCount,
    showCamera,
    setShowCamera,
    resetUploadedImages,
  };

  // Provide context value to children
  return (
    <ImageUploadContext.Provider value={value}>
      {children}
    </ImageUploadContext.Provider>
  );
};

// Custom hook to use the image upload context
export const useImageUploadContext = () => {
  const context = useContext(ImageUploadContext);
  return context;
};
