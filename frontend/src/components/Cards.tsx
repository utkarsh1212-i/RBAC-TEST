import React from 'react';
import { Card, Title, Text, Button } from '@mantine/core';

export function CardComponent({ id, title, description, buttonText, onClick, backgroundColor }) {
  return (
    <Card shadow="sm" p="lg" radius="md" style={{ backgroundColor }}>
      <Title order={4}>{title}</Title>
      <Text mt="sm">{description}</ Text>
      <Button variant="light" mt="md" onClick={onClick}>
        {buttonText}
      </Button>
</Card>
  );
}
