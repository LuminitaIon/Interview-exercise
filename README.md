# Interview-exercise
For Goosfraba interview

* fetching data
    I used @apollo/client and I created a Provider and a client that matches the Provider and uses the value of the ContextAPI
* displaying chart
    After I get the data from the endpoint, using useQuery from @apollo/client, 
    I used VISX library. For contructing the chart I used 40 000 data.
    I used a dictionary to help me to keep the data sorted by the month.

    I used a list of dictionaries to keep how many data we have related to every 
    month of the year

    After that I compose the values of axis based on frequency and the id of every
    month.

    I used VISX library to display tha chart based the data that I have

* displaying axis
   I tried to display at least one axis to make the chart more readable, but I
   faced some problems and I am still tried to figure out how to display axis
   using VISX library too.

   I left the code below in App.js commented.