`useFetch`

#### A custom React hook for fetching data using `Axios`.

### Usage

    import { useFetch } from 'fetch-data-react';

    const { request, data, status, error } = useFetch({
         url: 'https://jsonplaceholder.typicode.com/users',
          method: 'GET',
    });

    // call the request function to initiate the API call
    request();

    // access the response data after the API call has completed
    console.log(data);

    // check the status of the request
    console.log(status); // one of 'INITIAL', 'LOADING', 'FAILURE', or 'SUCCESS'

    // handle any errors that occurred during the API call
    if (error) {
      console.log(error);
    }

### Parameters

    url (string, required) // The URL to which the API call will be made.
    method (string, optional) // The HTTP method to use for the API call. Defaults to 'GET'.
    ...rest (any, optional) // Any additional Axios request configuration options that you want to pass to the Axios instance.

### Return Value

An object with the following properties:

    request (function): A callback function that initiates the API call.

    data (AxiosResponse | null): The response data from the API call, or null if the API call has not yet completed.

    status (RequestStatuses): The status of the API call, represented by one of the following RequestStatuses enum values:
        INITIAL: The initial state before the API call has been made.
        LOADING: The API call is currently in progress.
        FAILURE: The API call failed with an error.
        SUCCESS: The API call completed successfully.

error (AxiosError | null): The error that occurred during the API call, or null if no error occurred.

import { useFetch } from 'fetch-data-react';

const MyComponent = () => {
const { request, data, status, error } = useFetch({
url: 'https://jsonplaceholder.typicode.com/users',
method: 'GET',
});

const handleClick = () => {
request();
};

      return (
        <div>
          <button onClick={handleClick}>Fetch Data</button>
          {status === 'LOADING' && <div>Loading...</div>}
          {status === 'FAILURE' && <div>Error: {error?.message}</div>}
          {status === 'SUCCESS' && (
            <pre>{JSON.stringify(data?.data, null, 2)}</pre>
          )}
        </div>
      );
    };
