---
title: XmlParser
---

## XmlParser

`XML Module` presents a simple way to parse data from an XML content. One scenario where you can use this class is when a service returns an XML response. The module allows you to go through the XML code and to search for specific attribute and its value or to take the data(e.g. text value) locked between the XML elements.

The `XmlParser` constructor function has the following shape:
`XmlParser(onEvent: (event: ParserEvent) => void, onError?: (error: Error, position: Position) => void, processNamespaces?: boolean, angularSyntax?: boolean)`

Where:

- `onEvent`: The callback to execute when a parser event occurs. The `event` parameter contains information about the event.
- `onError`: The callback to execute when a parser error occurs. The 'error' parameter contains the error.
- `processNamespaces`: Specifies whether namespaces should be processed.

Below is a StackBlitz IDE with an example of how to use the `XmlParser` class. In order to try it out and see the results of the code, you have to download the Nativescript Preview 2.0 app from App Store and/or Google Play. Once you have the app on your phone, use the phone Camera to scan the QR code in the Preview tab.

<iframe width="100%" height="600px" src="https://stackblitz.com/edit/nativescript-stackblitz-templates-54tppc?embed=1&file=app/main-view-model.ts"></iframe>
	 
| Name           | Return Type     | Description                       |
| -------------- | ----------------| ---------------------------------------- |
| `parse(xmlString: string)`| `void`| Parses the supplied xml string.|

### ParserEventType class

This class specifies the type of parser event.

#### Static Properties

| Name           | Type     | Description                              |
| -------------- | -------- | ---------------------------------------- |
| `StartElement` | `string` | Specifies the `StartElement` event type. |
| `EndElement`   | `string` | Specifies the `EndElement` event type.   |
| `Text`         | `string` | Specifies the `Text` event type.         |
| `CDATA`        | `string` | Specifies the `CDATA` event type.        |
| `Comment`      | `string` | Specifies the `Comment` event type.      |

### Position

Defines a position within string, in line and column form.

| Name     | Type     | Description                                           |
| -------- | -------- | ----------------------------------------------------- |
| `line`   | `number` | The line number. The first line is at index 1.        |
| `column` | `number` | The column number. The first character is at index 1. |

### ParserEvent data

Provides information for a parser event. The `ParserEvent` data has the following properties:

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

| Name       | Return Type | Description                                                                                                     |
| ---------- | ----------- | --------------------------------------------------------------------------------------------------------------- |
| `toString` | `string`    | Returns a JSON string representation of this instance. <br>`xmlString`: The string containing the xml to parse. |

## API References
