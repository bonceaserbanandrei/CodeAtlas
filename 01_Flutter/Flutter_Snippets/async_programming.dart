void fetchData() async {
  print('Fetching data...');
  var data = await Future.delayed(Duration(seconds: 2), () => 'Data received');
  print(data);
}

void main() {
  fetchData();
  print('Doing other work...');
}