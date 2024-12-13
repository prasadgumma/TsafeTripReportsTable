import React from 'react'

const TernaryLogic = () => {
    let showRecipeOne = true;
    function getRecipeOneName(recipeName) {
        return recipeName;
    }

    function getRecipeTwoName(recipeName) {
        return recipeName;
    }

    if (showRecipeOne) {
        console.log(getRecipeOneName("Pizza"));
    } else {
        console.log(getRecipeTwoName("Coke"));
    }

    showRecipeOne
        ? console.log(getRecipeOneName("Pizza"))
        : console.log(getRecipeTwoName("Edi padithe adi"));
}

export default TernaryLogic