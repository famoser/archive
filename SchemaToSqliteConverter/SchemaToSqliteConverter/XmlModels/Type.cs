using System.Xml.Serialization;

namespace SchemaToSqliteConverter.XmlModels
{
        [XmlRoot(ElementName = "type")]
        public class Type
        {
            [XmlAttribute(AttributeName = "label")]
            public string Label { get; set; }
            [XmlAttribute(AttributeName = "quote")]
            public string Quote { get; set; }
            [XmlAttribute(AttributeName = "sql")]
            public string Sql { get; set; }
            [XmlAttribute(AttributeName = "length")]
            public string Length { get; set; }
            [XmlAttribute(AttributeName = "re")]
            public string Re { get; set; }
        }
}

