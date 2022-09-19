---
title: XmlParser
---

## XmlParser

The `XmlParser` class presents a simple way to parse data from an XML content. One scenario where you could use this class is when a service returns an XML response. With this class you can go through the XML code and search for specific attribute and its value or to take the data(e.g. text value) locked between the XML elements.

The `XmlParser` constructor function has the following shape:
`XmlParser(onEvent: (event: ParserEvent) => void, onError?: (error: Error, position: Position) => void, processNamespaces?: boolean, angularSyntax?: boolean)`

Where:

- `onEvent` is the callback to execute when a parser event occurs. The `event` parameter contains information about the event.
- `onError` is the callback to execute when a parser error occurs. The 'error' parameter contains the error.
- `processNamespaces` specifies whether namespaces should be processed.

Below is a StackBlitz IDE with an example of how to use the `XmlParser` class. In order to try it out and see the results of the code, download the `Nativescript Preview` app from App Store and/or Google Play. Once you have the app on your phone, use the phone Camera to scan the QR code in the Preview tab.

<iframe width="100%" height="600px" src="https://stackblitz.com/edit/nativescript-stackblitz-templates-54tppc?embed=1&file=app/main-view-model.ts"></iframe>

### Method(s)

| Name                       | Return Type | Description                                                                              |
| -------------------------- | ----------- | ---------------------------------------------------------------------------------------- |
| `parse(xmlString: string)` | `void`      | Parses the supplied xml string. <br>`xmlString`: The string containing the xml to parse. |

### ParserEventType class

From this class you get static properties that represent the various types of parser events.

#### Static Properties

| Name           | Type     | Description                              |
| -------------- | -------- | ---------------------------------------- |
| `StartElement` | `string` | Specifies the `StartElement` event type. |
| `EndElement`   | `string` | Specifies the `EndElement` event type.   |
| `Text`         | `string` | Specifies the `Text` event type.         |
| `CDATA`        | `string` | Specifies the `CDATA` event type.        |
| `Comment`      | `string` | Specifies the `Comment` event type.      |

### Position

Defines a position within a string, in line and column form.

| Name     | Type     | Description                                           |
| -------- | -------- | ----------------------------------------------------- |
| `line`   | `number` | The line number. The first line is at index 1.        |
| `column` | `number` | The column number. The first character is at index 1. |

### ParserEvent data

The `ParserEvent` object provides information about a parser event and it has the following properties:

| Name          | Type       | Description                                                                                                                                                       |
| ------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `eventType`   | `string`   | Returns the type of the parser event. This is one of the ParserEventType static members.                                                                          |
| `position`    | `Position` | Get the position in the xml string where the event was generated.                                                                                                 |
| `prefix`      | `string`   | If namespace processing is enabled, returns the prefix of the element in case the eventType is `ParserEventType.StartElement` or `ParserEventType.EndElement`.    |
| `namespace`   | `string`   | If namespace processing is enabled, returns the namespace of the element in case the eventType is `ParserEventType.StartElement` or `ParserEventType.EndElement`. |
| `elementName` | `string`   | If namespace processing is enabled, returns the namespace of the element in case the eventType is `ParserEventType.StartElement` or `ParserEventType.EndElement`. |
| `attributes`  | `Object`   | Returns a JSON object with the attributes of an element in case the eventType is `ParserEventType.StartElement`.                                                  |
| `data`        | `string`   | Returns the relevant data in case the eventType is `ParserEventType.Text`, `ParserEventType.CDATA` or `ParserEventType.Comment`.                                  |
| `toString()`  | `string`   | Returns a JSON string representation of this instance.                                                                                                            |

### API References

| Name                                                                                          | Type    |
| --------------------------------------------------------------------------------------------- | ------- |
| [@nativescript/core/XmlParser](https://docs.nativescript.org/api-reference/classes/xmlparser) | `Class` |
