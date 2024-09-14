class ResourceAllocator:
    def __init__(self, projects, resources):
        self.projects = projects
        self.resources = resources
        self.allocation = {}

    def allocate_resources(self):
        # Convert priority strings to numeric values
        self._convert_priorities()

        # (higher number = higher priority)---> to sort project
        self.projects.sort(key=lambda x: x['priority'], reverse=True)

        for project in self.projects:
            self.allocation[project['name']] = {}
            for resource_type, required_amount in project['requirements'].items():
                # Allocate resources based on availability
                available_amount = self.resources.get(resource_type, 0)
                allocated = min(required_amount, available_amount)
                self.allocation[project['name']][resource_type] = allocated
                # Update resource inventory
                self.resources[resource_type] -= allocated

        return self.allocation

    def _convert_priorities(self):
        # Convert priority strings to numeric values (1: High, 2: Medium, 3: Low)
        priority_map = {"high": 3, "medium": 2, "low": 1}

        for project in self.projects:
            priority_str = project['priority']
            # Convert priority string to lowercase and map it to a number
            if isinstance(priority_str, str):
                project['priority'] = priority_map.get(priority_str.lower(), 3)  # Default to low priority if not matched


# ek use case
projects = [
    {"name": "Project A", "priority": "high", "requirements": {"machinery": 5, "workers": 10}},
    {"name": "Project B", "priority": "low", "requirements": {"machinery": 3, "workers": 8}},
    {"name":"Project C", "priority": "medium", "requirements": {"machinery": 5, "workers":12}},
    {"name":"Project D", "priority": "high", "requirements":{"machinery": 5, "workers":18}}
]
resources = {"machinery": 8, "workers": 32}

allocator = ResourceAllocator(projects, resources)
allocation = allocator.allocate_resources()
print(allocation)
