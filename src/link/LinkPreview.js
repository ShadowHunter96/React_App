import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Placeholder } from 'react-bootstrap';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';


const LinkPreview = () => {
    const [links, setLinks] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await axios.get('http://localhost:8081/links-api/links');
                console.log("Response data:", response.data);
                setLinks(response.data);
            } catch (error) {
                console.error('There was an error fetching the links:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLinks();
    }, []);

    if (isLoading) {
        return <Placeholder as="p" animation="glow">Loading...</Placeholder>;
    }

    if (!links.length) {
        return <p>No links available.</p>;
    }

    return (
        <Container>
            <Row>
                {links
                    .filter(link => link.availableInFirefox || link.availableInChrome || link.isActive)
                    .map((link, index) => (
                        <Col sm={4} key={index}>
                            <Card className="mb-4 shadow-sm">
                                {link.imageBase64 ? (
                                    // Používáme imageBase64 pro zdroj obrázku
                                    <Card.Img variant="top" src={`data:image/png;base64,${link.imageBase64}`} />
                                ) : (
                                    <Placeholder as={Card.Img} animation="glow" />
                                )}
                                
                                <Card.Body>
                                </Card.Body>
                                <Card.Body>
                                    <Card.Title>{link.name}</Card.Title>
                                    <ReactQuill value={link.description}
                                        readOnly={false}
                                        theme={"bubble"}
                                        modules={{ toolbar: false }} />
                                    <Card.Link href={link.url} target={link.openInNewWindow ? '_blank' : '_self'}>
                                        Go to Link
                                    </Card.Link>
                                </Card.Body>

                            </Card>
                        </Col>
                    ))}

            </Row>
        </Container>
    );
};

export default LinkPreview;
