---
title: XmlParser
---

## XmlParser

## ParserEventType class

This class specifies the type of parser event.

### Static Properties

| Name           | Type     | Description                              |
| -------------- | -------- | ---------------------------------------- |
| `StartElement` | `string` | Specifies the `StartElement` event type. |
| `EndElement`   | `string` | Specifies the `EndElement` event type.   |
| `Text`         | `string` | Specifies the `Text` event type.         |
| `CDATA`        | `string` | Specifies the `CDATA` event type.        |
| `Comment`      | `string` | Specifies the `Comment` event type.      |

## Position

Defines a position within string, in line and column form.

| Name     | Type     | Description                                           |
| -------- | -------- | ----------------------------------------------------- |
| `line`   | `number` | The line number. The first line is at index 1.        |
| `column` | `number` | The column number. The first character is at index 1. |

## ParserEvent data

Provides information for a parser event. The PParserEvent data has the following properties:

| Name          | Type       | Description                                                                                                                                                       |
| ------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `eventType`   | `string`   | Returns the type of the parser event. This is one of the ParserEventType static members.                                                                          |
| `position`    | `Position` | Get the position in the xml string where the event was generated.                                                                                                 |
| `prefix`      | `string`   | If namespace processing is enabled, returns the prefix of the element in case the eventType is `ParserEventType.StartElement` or `ParserEventType.EndElement`.    |
| `namespace`   | `string`   | If namespace processing is enabled, returns the namespace of the element in case the eventType is `ParserEventType.StartElement` or `ParserEventType.EndElement`. |
| `elementName` | `string`   | If namespace processing is enabled, returns the namespace of the element in case the eventType is `ParserEventType.StartElement` or `ParserEventType.EndElement`. |
| `attributes`  | `Object`   | Returns a JSON object with the attributes of an element in case the eventType is `ParserEventType.StartElement`.                                                  |
| `data`        | `string`   | Returns the relevant data in case the eventType is `ParserEventType.Text`, `ParserEventType.CDATA` or `ParserEventType.Comment`.                                  |

### Method(s)

| Name       | Return Type | Description                                            |
| ---------- | ----------- | ------------------------------------------------------ |
| `toString` | `string`    | Returns a JSON string representation of this instance. |
