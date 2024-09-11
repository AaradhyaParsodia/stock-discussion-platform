# Stock Discussion Platform
Looking for a solid solution for a powerful backend application of public engagement in which a user can post stocks-market or financial-related posts, then this is the right spot to stop <br>
Yes, a secure and scalable Node.js (javascript) backend that does have solid documentation by leveraging the robust mechanism of Swagger API documents.

## Description
It is a well-defined structured program for making an interactive discussion platform that contains in-house/in-build user authentication using JWT (jsonwebtoken), and passwords are secured and stored by hashing them after several iterations of hash generation using a solid salt; additionally, validation is made using the Zod library to ensure there are no error input requests.

<br>
<h3>So what does it do?</h3>
<div>
Coming to the main point This application is mainly based on a strong backend understanding and making production-grade API documents for ease of use utilising the Swagger API documentation. In this application, an authenticated user can participate in the conversion of the posts using the comment section and on, like, if that post suits that particular user.
In simple words, a user can post an article, and another user can enjoy the content while keeping the power to like or dislike and add their inputs in the comment section. However, if any user requires that they also need to share their view, just sign up and register to make the first step in the wise world of the financial discussion platform. 
</div>

<br>
<br>
<h3>Where will it be useful?</h3>
To grow and leverage the power of the internet and connect with like-minded professionals by staying ahead of the time and making the right decisions, whether to buy it or sell, getting early information from the market using the right professional network.

## Getting Started

### Requirement
Please, before going ahead, make sure you have Node.js installed on your device, and you do have a MongoDB URL instance for storing the data.

### Get started
<u>Note:-</u><span> Please GO to the <b>localhost:3000/v1/api-docs</b> or which port you have manually configured inorder to find all the endpoints

### Installation
To install this tool, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/AaradhyaParsodia/stock-discussion-platform
    ```
2. Navigate into the cloned directory:
   ```sh
   cd stock-discussion-platform
   ```

Just follow the below commands after cloning this repo into your local environment, and you are good to go.

3. Install dependencies:

    ```sh
    npm install
    ```
This command will install all the dependencies.

4. Create .env
    ```sh
    touch .env && cp .env.example .env
    ```
    Please make sure to put every details and key upfront in the .env file.

## Usage

```sh
node index.js
```
At the root directory, run that command and make sure again you are at the right directory level. After running it <b>Please go to the localhost:3000/v1/api-docs </b> to check which endpoints are there.