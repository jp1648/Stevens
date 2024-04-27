##JAY PATEL##

from collections import defaultdict, deque

def compute_stations_in_reach(network, num_stations, num_links):
    stations_in_reach = defaultdict(set)

    for station in range(num_stations):
        visited = set() 
        visited.add(station)  
        stations_queue = deque()
        stations_queue.append(station)
        current_distance = 0

        while stations_queue and current_distance <= num_links:
            current_station = stations_queue.popleft()

            if current_distance <= num_links:
                stations_in_reach[station].add(current_station)

            if current_distance < num_links:
                neighbors = network[current_station]
                unvisited_neighbors = [neighbor for neighbor in neighbors if neighbor not in visited]
                stations_queue.extend(unvisited_neighbors)
                visited.update(unvisited_neighbors)  
                current_distance += 1

    return stations_in_reach


def main():


    network = {
         0: (0, 1),
         1: (1, 2), 
         2: (1, 3),
         3: (2, 4), 
         4: (2, 5), 
         5: (3, 6), 
         6: (3, 7), 
         7: (4, 5), 
         8: (5, 6), 
         9: (6, 7)
    }


    num_stations = 8
    num_links = 10

    stations_in_reach = compute_stations_in_reach(network, num_stations, num_links)

   
    for station in range(num_stations):
        print(f"Reachable stations from station {station}: {stations_in_reach[station]}")
