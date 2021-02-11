import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document{
   render(){
      return(
         <Html lang="en">
            <Head>
               <meta name="description" content="E-Commerce website with Next.Js" />
               <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"></link>
               <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
               <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
               <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js"></script>
               <script src="https://kit.fontawesome.com/a076d05399.js"></script>
            </Head>
            <body>
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}

export default MyDocument;