import { motion } from "framer-motion";

export const LoadingComponent = () => {
    
    //Loading animations declarioations. Thsi animation is three dots that go up and down in a wawe animation Declaring the animation and some styling for the circles
    const loadingContainer = {
    width: "4rem",
    height: "4rem",
    display: "flex",
    justifyContent: "space-around"
    };

    const loadingCircle = {
        display: "block",
        width: "5rem",
        height: "1.5rem",
        backgroundColor: "black",
        borderRadius: "50%"
    };

    const loadingContainerVariants = {
        start: {
            transition: {
                staggerChildren: 0.2,
            },
        },
        end: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    }
    const loadingCircleVariants = {
        start: {
            y: "0%",
        },
        end: {
            y: "100%",
        },
    }
    const loadingCircleTransition = {
        duration: 0.5,
        yoyo: Infinity,
        ease: "easeInOut",
    }

    return (
        <>
            <h5>Sparar bokningen... </h5>
            <motion.div
            style={loadingContainer}
            variants={loadingContainerVariants}
            initial="start"
            animate="end"
            >
                <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
                />
                <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
                />
                <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
                />
            </motion.div>
        </>
    );
}