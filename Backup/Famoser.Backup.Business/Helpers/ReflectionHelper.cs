using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Famoser.Backup.Business.Models;
using Famoser.Backup.Business.Services;
using Famoser.Backup.Business.Services.Interfaces;

namespace Famoser.Backup.Business.Helpers
{
    public class ReflectionHelper
    {
        private static List<Type> GetTypesInNamespace(string nameSpace)
        {
            return Assembly.GetExecutingAssembly().GetTypes().Where(t => t.Namespace == nameSpace && !t.FullName.Contains("+")).ToList();
        }

        public static void ConstructServicesIntoConfiguration(IConsoleService service, IProgressService progressService, List<ServiceConfig> configs)
        {
            foreach (var serviceConfig in configs)
            {
                var t = Type.GetType(serviceConfig.ServiceName);

                ConstructorInfo ctor = t.GetConstructors()[0];
                serviceConfig.Instance = 
                    ctor.Invoke(new object[]
                    {
                            service,
                            progressService,
                            serviceConfig.Configuration
                    }
                        );
            }
        }

        public static List<string> GetSourcesObjectNames()
        {
            return GetTypesInNamespace(@"Famoser.Backup.Business.Sources").Select(source => source.FullName).ToList();
        }
    }
}
