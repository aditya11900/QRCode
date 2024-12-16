// Import required modules
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

// Ask the user to input a URL
inquirer
    .prompt([
        { message: "Type your URL", name: "URL" },
    ])
    .then((answers) => {
        // Store the URL input by the user
        const url = answers.URL;

        // Generate QR code for the URL
        const qr_svg = qr.image(url);

        // Create a writable stream for saving the QR code image as a PNG file
        const qrFileStream = fs.createWriteStream('qr_img.png');

        // Pipe the QR code image into the file stream to save it as a file
        qr_svg.pipe(qrFileStream);

        // Inform the user when the QR code has been saved
        qrFileStream.on('finish', () => {
            console.log("QR Code has been saved as qr_img.png");
        });

        // Save the URL into a text file
        fs.writeFile('qr_img.txt', url, (err) => {
            if (err) {
                // Handle error in saving the text file
                console.log("Error saving the text file:", err);
            } else {
                // Inform the user when the text file is saved successfully
                console.log("The URL has been saved to qr_img.txt!");
            }
        });
    })
    .catch((error) => {
        // Error handling for any issues during the prompt
        if (error.isTtyError) {
            console.log("Prompt couldn't be rendered in the current environment");
        } else {
            console.log("Something went wrong:", error);
        }
    });
