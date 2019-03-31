export const getId = () => {
    return Math.round((((Math.random() * 150) * Math.random())
    + (Math.random() * 1000))
    / (Math.random() * 30 + Math.random()));
};

export const delFromObj = (object, prop) => {
    const newObject = {
        ...object,
    };

    delete newObject[prop];

    return newObject;
};

// export default getId;
