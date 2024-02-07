
/**
 * This Javascript function contains script that sends XHR request to InfoObjectHub backend
 * You need to configure LOGGER_URL const with endpoint for JSON communication
 * Typically this would be: http://your-server-ip:8080/api/info-object
 * Usage example: submitInfoObject('Content of your info object', 'topic-of-your-infoobject', 'tag-of-your-infoobject')
 */
export default function submitInfoObject(content, topic, tag) {
    const LOGGER_URL = 'http://192.168.1.13:8080/api/info-object'
    const infoObjectData = {
        'content': content,
        'topic': topic,
        'tag': tag,
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(infoObjectData),
    };

    fetch(LOGGER_URL, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            }
            throw new Error('Response not JSON');
        })
        .then(data => {
            if (data.message) {
                console.log(data.message);
            } else {
                let errorMessage = 'Failed to submit:\n';
                for (const [field, message] of Object.entries(data)) {
                    errorMessage += `${field}: ${message}\n`;
                }
                alert(errorMessage);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while sending request: ' + error);
        });
}
